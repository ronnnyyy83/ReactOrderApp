import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
   
const JiraRow = (props) => {
    return (
        <Aux>
            <tr>
                <td>{props.jiraItem.key}</td>
                <td>{props.jiraItem.fields.summary}</td>
                <td>
                    <a href={`https://domain.atlassian.net/projects/CC/board?issue-key=${props.jiraItem.key}`} 
                    target="_blank" rel="noopener noreferrer">Go to Item</a>
                </td>
            </tr>
        </Aux>
    )
}
 
export default JiraRow;