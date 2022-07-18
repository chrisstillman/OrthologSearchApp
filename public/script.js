window.onload = function() {
    const btn = document.querySelector(".button");
    document.querySelector("button").addEventListener('click',(event)=> {
        btn.classList.add("button--loading");
        var inputs = document.querySelectorAll("input");
        var values = [];
        for(var i = 0; i < 11; i++) { //chekc this
            values.push(inputs[i].checked ? 1 : 0);
        }

        console.log('send')
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/generate', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log('received');
                console.log(xhr.response);
                const data = xhr.response.split('\n');

                let html = '<table border="1"><tr><th>Dmel</th><th>Ortho_ID</th><th>Species_ID</th><th>EOG</th></tr>';

                for(var i = 0; i < data.length; i++) {
                    const row = data[i].split('\t');
                    html += '<tr>';
                    for(var k = 0; k < row.length; k++) {
                        html += '<td>' + row[k] + '</td>';
                    }
                    html += '</tr>';
                }
                document.write(html);
                //window.location.href = '/'+xhr.response+'.txt';
            }
        }
        xhr.send(JSON.stringify({
            values
        }));
    });
    btn.classList.remove("button--loading");
};