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
      if(action.type === 'server/export_master_update'){
        socket.broadcast.emit('action', {type:'server/import_master_update', data:action.payload})
      }
    })

    socket.on('disconnect', function (data) {
      console.log('Client disconnected:', socket.id);
    });
  });
}
