<script>
  function expandInformation() {
    event.preventDefault(); 

    // just expand for information
    let element = document.getElementById("howto");

    // check the visibility of the element: 
    element.classList.add()
  }
</script>

<!-- html for navbar -->
<div id = "title">
  <h3>
    Proxima 
  </h3>
  <img src="res/rocket.png" alt="rocket emoji">
</div>


<h6>
  External Recruitment Data For VHIII 
</h6>

<p>
  <!-- Simple routing -->
  <a href="" on:click={expandInformation}>
    How do I use this application? 
  </a>
</p>

<p id = "howto" class = "hidden" >
  This is a test.
</p>

<style>
  #title {
    display: flex; 
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  img {
    height: 30px;
    width: 30px;
    margin-left: 10px;
    margin-top: 10px;
  }
  h3, h6, p{
    text-align: center;
  }
  .hidden {
    display: none; 
  }

  .show {
    display: block;
  }
</style>