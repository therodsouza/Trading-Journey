import React from 'react';
import JournalEntry from './JournalEntry/JournalEntry';

const JournalEntries = props => {

    const entries = props.entries.map(session => {
        return <JournalEntry entry={session} />
    })

    return (<div>
        <h4>Journal Entries</h4>
        {entries}
    </div>)
}

export default JournalEntries;