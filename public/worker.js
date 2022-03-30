
onmessage = (e) =>  {
  console.log('Worker: Message received from main script');
  if(e.data && e.data.length ){
    const result = (parseInt(e.data[0]) + parseInt(e.data[1]));
    if (isNaN(result)) {
      postMessage('Please write two numbers');
    } else {
      const workerResult = result;
      console.log('Worker: Posting message back to main script');
      postMessage(workerResult);
    }
  }
}
