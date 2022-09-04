const catagoryList = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    CreateACatagory(data.data.news_category);
  } catch (err) {
    console.log(err);
  }
};

const HomePage1 = async () => {
  catagoryId(8);
};

const CreateACatagory = (item) => {
  const ul = document.getElementById("catagoryList1");
  item.map((res) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <li onclick="catagoryId(${res.category_id})">${res.category_name}</li>
    `;
    ul.appendChild(li);
  });
};

const spinnerFunc1 = (sp) => {
  const parentdiv = document.getElementById("spinnerLoading");
  parentdiv.textContent = "";
  const div = document.createElement("div");
  !sp &&
    (document.getElementById("homepage").classList.add("d-none"),
    (div.innerHTML = `
    <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
    
    `));
  parentdiv.appendChild(div);

  sp && document.getElementById("homepage").classList.remove("d-none");
};

const catagoryId = async (id) => {
  //console.log(id);
  spinnerFunc1(false);
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/0${id}`
    );
    const data = await res.json();
    spinnerFunc1(true);
    displayNewThing(data.data);
    document.getElementById("itemNumberCard").classList.remove("d-none");
    document.getElementById("sortCard").classList.remove("d-none");
    document.getElementById("itemNumber").innerText = `${
      data.data.length
    } items found for catagory ${
      id === 1
        ? "Breaking News"
        : id === 2
        ? "Regular News"
        : id === 3
        ? "International News"
        : id === 4
        ? "Sports"
        : id === 5
        ? "Entertaintment"
        : id === 6
        ? "Culture"
        : id === 7
        ? "Arts"
        : "All News"
    } `;
  } catch (err) {
    console.log(err);
  }
};

const displayNewThing = (item) => {
  item.sort((a, b) => b.total_view - a.total_view);
  const parentDiv = document.getElementById("newsContent");
  parentDiv.textContent = "";
  item.map((res) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img src=${
          res.thumbnail_url
        } class="img-fluid newsThum rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${res.title ? res.title : "No Title"}</h5>
          <p class="card-text">${
            res.details ? res.details : "No description"
          }.</p>
          <div class='row'>
           <div class='col-md-4'>
             <div class='author my-4'>
              <div class='autherPic mx-2' >
                <img src=${res.author.img}>
              </div>
              <div class='autherDetails mx-2' >
               <h6>${res.author.name ? res.author.name : "No Name"}</h6>
               <small>${
                 res.author.published_date
                   ? res.author.published_date
                   : "No Date"
               }</small>
               </div> 
             
             </div>
           
           </div>

           <div class='col-md-4 my-4'>
             <div class='view  d-flex'>
             <i class="fas mx-2 fa-eye"></i>
             <p class=''>${
               res.total_view ? res.total_view + " M" : "No View"
             }</p>
             </div>
           
           </div>

           

         <div class='col-md-2 my-4'>
         <button onclick="openModal('${
           res._id
         }')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
         Read
       </button>
       <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel"></h5><br>
      
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <small id=authorName></small><br>
    <small id=publishDate></small><br>
    <br>
    <br>
    <small id='details'></small>
    <br>
    <br>

    <small id=ratingNumber></small><br>
    <small id=newsViwe></small><br>
    <small id=badge></small>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </div>
  </div>
</div>  

       </div>
         </div>
    `;
    parentDiv.appendChild(div);
  });
};

const openModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${id}`
  );
  const data = await res.json();
  console.log(data.data);
  document.getElementById("exampleModalLabel").innerText = data.data[0].title
    ? data.data[0].title
    : "No title";
  document.getElementById("details").innerText = data.data[0].details
    ? data.data[0].details
    : "No Post";
  document.getElementById("authorName").innerText = data.data[0].author
    ? "Author:" + data.data[0].author.name
    : "No author name";
  document.getElementById("publishDate").innerText = data.data[0].author
    ? "Publish:" + data.data[0].author.published_date
    : "No Publish Date";
  document.getElementById("newsViwe").innerText = data.data[0].total_view
    ? "View:" + data.data[0].total_view + "M"
    : "No View";
  document.getElementById("ratingNumber").innerText = data.data[0].rating
    ? "Rating:" + data.data[0].rating.number
    : "No rating";
  document.getElementById("badge").innerText = data.data[0].rating
    ? "Rating:" + data.data[0].rating.badge
    : "No badge";
};

//function
catagoryList();
HomePage1();
