jQuery.get('https://picole-pi2.herokuapp.com/machines/', function(data) {


      var sel = document.getElementById('comboMachines');
      var opt = null;

      for(i = 0; i<data.length; i++) { 

        opt = document.createElement('option');
        opt.value = data[i].id;
        opt.innerHTML = data[i].id;
        sel.appendChild(opt);
      }

  });