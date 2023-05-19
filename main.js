const API_URL_Random=" https://api.thedogapi.com/v1/images/search?limit=2";
const API_URL_Favoritos='https://api.thedogapi.com/v1/favourites';
const API_URL_Delete_Favoritos = (id) =>`https://api.thedogapi.com/v1/favourites/${id}`
const API_URL_SubirPhoto='https://api.thedogapi.com/v1/images/upload';
                                               
const spanError = document.getElementById('error')

async function CargarRandomDogs(){

    const res = await fetch(API_URL_Random) //cargas la API
    const data = await res.json(); //traes la información de la API en Json

    console.log('CargarRandomDogs_Cargar1')
    console.log(data)

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error:" + res.status;
        
    }else{
        const img1 = document.getElementById('img1');//le asignas un valor a img1 del html
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1'); // cargamos los combos
        const btn2 = document.getElementById('btn2');

        img1.src = data[0].url //cargas la información de data a esa img1.src
        img2.src = data[1].url   
        
        btn1.onclick =() => saveFavoritosDogs(data[0].id);// asignamos el onclick al btn1
        btn2.onclick =() => saveFavoritosDogs(data[1].id);
    }
    };


async function CargarFavoritosDogs(){
            const res = await fetch(API_URL_Favoritos,{  //cargas la API
                method:'GET',
                headers: {
                  'x-api-key':'218d6a21-8922-4d5d-9913-2cb87bc4e3aa',
                },
            });

            const data = await res.json(); //traes la información de la API en Json

            console.log('FavoritosDogs_Cargar2')
            console.log(data)

        if(res.status !==200){
            spanError.innerHTML = "Hubo un error:" + res.status + data.message;
        }  else{
        const section = document.getElementById('favoritesDog');// tomamos el nodo de section de nuestro HTML    
        section.innerHTML="";//limpiar nuestra seccion  
        
        const h2 = document.createElement('h2'); //crear el elemneto h2
        const h2Text = document.createTextNode('Perros Favoritos'); //crear el texto 
        h2.appendChild(h2Text); // insertar el texto en el h2
        section.appendChild(h2);//insertar el h2 en la seccion

           data.forEach(perrito => {
// Estamos manupulando el html desde js para ingresarle los datos            

         const article = document.createElement('article');// tomamos el nodo de article de nuestro HTML 
         const img = document.createElement('img');// tomamos el nodo de img de nuestro HTML 
         const btn = document.createElement('button');// tomamos el nodo de bton de nuestro HTML 
         const btnText = document.createTextNode('Sacar del Favorito🧨');// tomamos el nodo de texto del boton de nuestro HTML 

//Insertamos la información de la seccion de arriba

         img.src = perrito.image.url //a la imagen se le agrega la ruta el SRC
         img.width = 150; // ajustamos el tamaño de la imagen
         btn.appendChild(btnText);//le ingresamos al boton el texto
         btn.onclick = () => deleteFavoritosDogs(perrito.id);
         article.appendChild(img); // en la seccion de articulo insertamos la imagen
         article.appendChild(btn); // en la seccion de articulo insertamos el boton
         section.appendChild(article);//insertamos el articulo en la seccion 

            
           });
        }  
    };    


async function saveFavoritosDogs(id){
        const res = await fetch(API_URL_Favoritos, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // lo esta traduciendo en JSON
              'x-api-key':'218d6a21-8922-4d5d-9913-2cb87bc4e3aa',
            },
            body: JSON.stringify({ //Lo stringifiamos a Json
              image_id: id
            }),
          });
          const data = await res.json();

        console.log('saveFavoritosDogs_Cargar3')
        console.log(res)

        if(res.status !==200){
            spanError.innerHTML = "Hubo un error:" + res.status + data.message;
        }else{
            console.log('Se guardo el perro en favoritos');
            CargarFavoritosDogs();
        }
           
    }

async function deleteFavoritosDogs(id){
        const res = await fetch(API_URL_Delete_Favoritos(id), {
            method: 'DELETE',
            headers:{
                'x-api-key':'218d6a21-8922-4d5d-9913-2cb87bc4e3aa',
            }
          });
          const data = await res.json();    
          
          if(res.status !==200){
            spanError.innerHTML = "Hubo un error:" + res.status + data.message;
        }else{
            console.log('Se elimino el perro de favoritos')
            CargarFavoritosDogs();
        }
    };

async function subirDogPhoto(){ //creamos la funcion
    const form = document.getElementById('subirFormulario'); // metemos en una variable el 'subirFormulario' del html
    const formData = new FormData(form);//toma todos los valores de form y los inserta en nuestra instancia formData

        console.log(formData.get('file'));

    const res = await fetch(API_URL_SubirPhoto,{
        method: 'POST',
        headers: {
        //'Content-Type': 'multipart/form-data', // lo esta traduciendo en JSON
        'x-api-key':'218d6a21-8922-4d5d-9913-2cb87bc4e3aa',
        },
        body: formData, 
    })
        const data = await res.json();

        if(res.status !==201){
            spanError.innerHTML = "Hubo un error:" + res.status + data.message;
            console.log({data})
        }else{
            console.log('Foto subida :)')
            console.log({data});
            console.log(data.url);
           saveFavoritosDogs(data.id);

        }

}

    CargarRandomDogs();
    CargarFavoritosDogs();


    