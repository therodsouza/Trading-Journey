import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Journal = props => {

    const sessions = props.sessions;
    const token = props.token;
    const onFetchSessions = props.onFetchSessions;

    useEffect(() => {
        onFetchSessions(token);
    }, [token, onFetchSessions]);

    return (<div>
        <p>Journal</p>
        {sessions.map(session => {
            return <p>{session.id}</p>
        })}
    </div>)
}

const mapStateToProps = state => {
    return {
        sessions: state.journal.sessions,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSessions: (token) => dispatch(actions.fetchSessions(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Journal, axios));