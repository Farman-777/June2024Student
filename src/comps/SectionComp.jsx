import React, { useEffect, useState } from 'react';
import { Row, Collapse } from 'react-bootstrap';


const SectionComp = (props) => {

    const { sectionTitle, children, collapse, collapsedSec = true, type, pt0 = false } = props;

    const [collapsed, setCollapsed] = useState(collapsedSec);


    useEffect(() => {
        setCollapsed(collapsedSec);
    }, [collapsedSec])

    const handleCollapse = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setCollapsed(!collapsed)
    }

    return (
        <>
            {
                type === 'textWithin' ?
                    (
                        <fieldset className={`border border-success p-3 ${pt0 && 'pt-0'} pb-0`} >
                            <legend className="float-none w-auto sectionTitle" style={{ "cursor": "pointer" }} onClick={collapse ? handleCollapse : null}> {sectionTitle} </legend>
                            <Collapse in={collapsed}>
                                <Row >{children}</Row>
                            </Collapse>
                        </fieldset>
                    ) :

                    (
                        <Row onClick={collapse ? handleCollapse : null} >
                            <div className='sectionRow' style={{ "cursor": "pointer" }}>{sectionTitle}</div>
                            <Collapse in={collapsed}>
                                <Row >{children}</Row>
                            </Collapse>
                        </Row>
                    )

            }

        </>
    )
}

export default SectionComp;