import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Journal = props => {

    const onFetchSessions = props.onFetchSessions;
    const sessions = props.sessions;

    useEffect(() => {
        onFetchSessions();
    }, [onFetchSessions]);

    return (<div>
        <p>Journal</p>
        {sessions.map(session => {
            return <p>{session.id}</p>
        })}
    </div>)
}

const mapStateToProps = state => {
    return {
        sessions: state.journal.sessions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSessions: () => dispatch(actions.fetchSessions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Journal, axios));