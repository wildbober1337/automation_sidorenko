function loadScript(callback) {
    wait(callback)
  }
  async function wait(callback) {
    await new Promise(resolve => {
        setTimeout(() => { 
            callback();
        }, 2000);
    });
  }
  
  loadScript(function(){console.log("It works")});