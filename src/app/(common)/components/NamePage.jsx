import {useState} from "react";
import {Heading} from "@navikt/ds-react";

function Name() {
     const [name, setName] = useState("");

     fetch('/min-side/api/aduser/api/v1/personalia')
        .then((response) => {
            if(response.status === 200) {
                return response.json();
            }
        }).then((data) => {
                setName(data.navn);
            }
        )

    return (
        <Heading level="1" size="xlarge" align="center" className="mb-1">
            {name}
        </Heading>
    )
}

export default Name;
