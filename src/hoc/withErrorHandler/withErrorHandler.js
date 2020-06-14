import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Wrapper from '../WrapperAux/WrapperAux';

const withErrorHandler = (WrappedComponent, axios) => {

    return class ErrorHandler extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(
                res => res,
                err => {
                    this.setState({ error: err });
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (<Wrapper>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent  {...this.props} />
            </Wrapper>);
        }
    }
}

export default withErrorHandler;