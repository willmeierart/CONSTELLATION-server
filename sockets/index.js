module.exports = function(io) {
  function dummyColorArray(){
    const newRandomColor=()=>{
      const dot = [];
      [0,0,0].forEach(x=>dot.push((Math.random()*255).toFixed(0)))
      return dot
    }
    const makeDummyArray=()=>{
      const initialState = []
      for (let i = 0; i < 2048; i++){
        initialState.push(newRandomColor())
      }
      return initialState
    }
    return makeDummyArray()
  }

  let realArray = dummyColorArray()

  io.on('connection', function (socket) {
    console.log('Client connected:', socket.id);

    socket.on('action', (action)=> {
      // console.log(action)
      if(action.type === 'server/import_master_update'){
        // console.log(action)
        io.emit('action', {type:'export_master_update', data:action})
      }
    })

    socket.on('disconnect', function (data) {
      console.log('Client disconnected:', socket.id);
    });

    // socket.on('hello', function (data) {
    //   console.log(data);
    //   io.emit('hello', data);
    // });
  });
}
