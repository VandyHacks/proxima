<script>
import { Link } from "svelte-routing";

// Get applications from Table
export let application;
let { 
    id, 
    director, 
    name, 
    resume_link, 
    email, 
    year, 
    committees, 
    status } = application;


const changeStatus = (applicationId, newStatus) => {
    // Post request for change of status
    
    // Add the class of status to the row
}

</script>

<style>
.padding {
    margin-top: 10px;
}

tr.rows > td {
text-align: center;
}

tr.director {
border-left: 3px solid #2196f3;
}

tr.accepted {
border-left: 3px solid #26a69a;
background: #cfe3cf;
}

tr.rejected {
border-left: 3px solid red;
background: #fd969645;
}

tr.to-interview {
border-left: 3px solid #f3be21;
background: #f3be213b;
}

td.links > a {
color: #2196f3;
}

td.links > a > i {
width: 100%;
}

i.tiny {
font-size: 0.7rem;
}

</style>


<tr class="rows 
    {(director) ? "director" : ''}
    {(status === "accepted") ? "accepted" : ''}
    {(status === "rejected") ? "rejected" : ''}
    {(status === "to_interview") ? "to-interview" : ''}">
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