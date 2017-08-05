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
    socket.broadcast.to(socket.id).emit('pi', {type:'server/import_master_update', data: realArray})
    socket.broadcast.to(socket.id).emit('action', {type:'server/import_master_update', data: realArray})
    concurrentUsers++
    io.emit('users', {concurrentUsers: concurrentUsers})

    socket.on('action', (action)=> {
      if(action.type === 'server/export_master_update'){
        realArray[action.payload.index] = action.payload.data
        io.emit('update', action.payload.data)
        io.emit('action', {type:'server/import_master_update', data: realArray})
      }
    })

    socket.on('disconnect', function (data) {
      console.log('Client disconnected:', socket.id);
      concurrentUsers--
      io.emit('users', {concurrentUsers: concurrentUsers})
    });
  });
}
