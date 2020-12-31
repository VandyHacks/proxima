<script>
export let application;
let { id, director, name, resume_link, email, year, committees, status } = application;
console.log(application)
</script>


<tr class="rows {director || ''}">
          <td class="name">
            {name}
          </td>

          <td class="links">
            <a href={resume_link} target="_blank">
              <i class="material-icons">insert_drive_file</i>
            </a>
          </td>

          <td class="email">
            <a href="mailto:{email}">
            {email}
            </a>
          </td>

          <td class="year">{year.replace(/^./, year[0].toUpperCase())}</td>

          <td class="committees">
            {#each committees as committee}
              <div class="chip">
                {committee.replace(/^./, committee[0].toUpperCase())}
              </div>
            {/each}
          </td>

          <td>
            <Link to="/notes/{id}">
              <button class="sort btn blue waves-effect waves-light padding">
                Interview
              </button>
            </Link>
          </td>

          <td>
            <b>
              <Link to="/interview/{id}">View</Link>
            </b>
          </td>

          <td class="status">
             <!-- Dropdown Trigger -->
            <a class='dropdown-trigger btn' href='#' data-target='dropdown{id}'>
              {status}
              <i class="tiny material-icons">edit</i>
            </a>
            <!-- Dropdown Structure -->
            <ul id='dropdown{id}' class='dropdown-content'>
              <li><a href="#!">Accepted</a></li>
              <li><a href="#!">Rejected</a></li>
              <li><a href="#!">Interview</a></li>
            </ul>
            
          </td>
        </tr>