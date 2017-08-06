module.exports = function(io) {
  function initializeArray(){
    const makeDummyArray=()=>{
      const initialState = []
      for (let i = 0; i < 2048; i++){
        initialState.push({backgroundColor: 'rgb(255,255,255)'})
      }
      return initialState
    }
    return makeDummyArray()
  }

  let realArray = initializeArray()
  let concurrentUsers = 0

  io.on('connection', function (socket) {
    console.log('Client connected:', socket.id);
    //send array state to user on making socket connection
    //io.emit('pi', {data: realArray})
    //socket.broadcast.to(socket.id).emit('action', {type:'server/import_master_update', data: realArray})
    io.emit('init', {data: realArray})
    concurrentUsers++
    io.emit('users', {concurrentUsers: concurrentUsers})

    socket.on('action', (action)=> {
      if(action.type === 'server/export_master_update'){
        realArray[action.payload.index] = action.payload.data
        io.emit('update', converter(action.payload))
        io.emit('action', {type:'server/import_master_update', data: realArray})
      }
    })

    socket.on('disconnect', function (data) {
      console.log('Client disconnected:', socket.id);
      concurrentUsers--
      io.emit('users', {concurrentUsers: concurrentUsers})
    });
  });

  function converter(input){
    const index = input.index
    const color = input.data.backgroundColor
    const findMultiDimArray=(i)=>{
      const RGBdata = {x:0,y:0}
      if (i<64){
        let base =i+100
        RGBdata.x=base%64
      } else {
        RGBdata.x= i %64
      }
      RGBdata.y = (i-RGBdata.x)/64
      console.log(RGBdata)
      return RGBdata
    }
    const rgb = color.match(/\d+/g)
    const output = [findMultiDimArray(index).x, findMultiDimArray(index).y, rgb[0], rgb[1], rgb[2]]
    return output
  }
}
