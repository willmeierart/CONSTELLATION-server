module.exports = function(io) {
  function initializeArray(){
    const makeDummyArray=()=>{
      const initialState = []
      for (let i = 0; i < 2048; i++){
        initialState.push({backgroundColor: 'rgb(0,0,0)'})
      }
      return initialState
    }
    return makeDummyArray()
  }

  let realArray = initializeArray()
  let concurrentUsers = 0

  var users = io.of('/users');
  users.on('connection', function(socket){
    console.log('someone connected to users');
    concurrentUsers++
    users.emit('users', {concurrentUsers: concurrentUsers})


    socket.on('disconnect', function (data) {
      console.log('Client disconnected:', socket.id);
      concurrentUsers--
      users.emit('users', {concurrentUsers: concurrentUsers})
    });
  });

  io.on('connection', function (socket) {

    console.log('Client connected:', socket.id);
    //send array state to user on making socket connection
    //io.emit('pi', {data: realArray})
    //socket.broadcast.to(socket.id).emit('action', {type:'server/import_master_update', data: realArray})
    let initArray = []
    for(let pixel in realArray){
      initArray.push(converter({index: pixel, data: realArray[pixel]}))
      //console.log(initArray[pixel])
    }
    io.emit('init', {data: initArray})
    //concurrentUsers++
    //io.emit('users', {concurrentUsers: concurrentUsers})

    socket.on('action', (action)=> {
      if(action.type === 'server/export_master_update'){
        //console.log(action.payload)
        const copyArray = realArray.slice()
        //realArray[action.payload.index] = action.payload.data
        copyArray[action.payload.index] = action.payload.data
        //io.emit('update', converter(action.payload))
        //io.emit('update', {index: action.payload.index, data: action.payload.data})
        let data = converter(action.payload)
        if(data){
          io.emit('update', {data: data})
        }
        //console.log(copyArray)
        //console.log(copyArray)
        //io.emit('action', {type:'server/import_master_update', data: realArray})
        io.emit('action', {type:'server/import_master_update', data: copyArray})
        realArray=copyArray
      }
    })

    socket.on('disconnect', function (data) {
      console.log('Client disconnected:', socket.id);
      //concurrentUsers--
      //io.emit('users', {concurrentUsers: concurrentUsers})
    });
  });

  function converter(input){
    if (input.data){
    const index = input.index
    const color = input.data.backgroundColor
    const findMultiDimArray=(i)=>{
      // const RGBdata = {x:0,y:0}
      const RGBdata = {}
      if (i<64){
        let base =i+64
        RGBdata.x=parseInt(i)
        RGBdata.y=0
      } else {
        RGBdata.x= i %64
        RGBdata.y = (i-RGBdata.x)/64
      }
      //console.log(RGBdata.y)
      //console.log(RGBdata)
      return RGBdata
    }
    const rgb = color.match(/\d+/g)
    const output = [findMultiDimArray(index).x, findMultiDimArray(index).y, parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])]
    return output
  } else {
    return [ 0, 0, 0, 0, 0 ]
  }
  }
}
