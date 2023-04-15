import { OurTeam, ServiceWhatWeDo } from "./Home";



export default function AboutPage(){
    return(<>
    {WhoWeAre()}
    {OurTeam()}
    {ServiceWhatWeDo()}
    </>)
}

function WhoWeAre(){
    return(<>
    <div className="container about">
        <center>
        <h1 className="my-text display-2 my-5 fw-bold">
            Who We Are ?
        </h1>
        </center>
        <div className="row">
            <div className="col-md-6">
                <img src="./logo.PNG" style={{width:"100%",height:"400px",objectFit:"cover"}} alt="" />
            </div>
        <div className="col-md-6 mt-3">
           <small className="mt-4 h5" style={{textAlign:"justify"}}>
             We Are Some People Which Work For Freedom Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptate dolore eligendi non saepe quae quibusdam pariatur expedita libero. Deleniti excepturi reiciendis pariatur consectetur quae veniam ad nostrum, totam optio eum, nobis ipsam ab officiis architecto ipsum. Quae maiores repellat illum rerum distinctio provident placeat ab deleniti corrupti quasi, quibusdam aliquid, praesentium ipsum deserunt voluptatem illo, expedita velit commodi dolor autem! Adipisci beatae odio quo dolorum dolor quisquam? Libero non obcaecati nobis et dolores reiciendis error, quam soluta possimus unde pariatur voluptates quae iusto, modi vitae aperiam a aut? Sapiente sunt nemo repellat sit quo perspiciatis quia soluta aut quam.
            </small> 
        </div>
        </div>
    </div>
    </>)
}