window.onload = function() {
    document.querySelector(".spinner").hidden = true;
    document.querySelector("input#submitBtn").addEventListener('click',(event)=> {
        document.querySelector(".spinner").hidden = false;
        var inputs = document.querySelectorAll("input");
        var values = [];
        for(var i = 0; i < 10; i++) {
            values.push(inputs[i].checked ? 1 : 0);
        }

        console.log('send')
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/generate', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                window.location.href = '/'+xhr.response+'.txt';
            }
        }
        xhr.send(JSON.stringify({
            values
        }));
    });
};