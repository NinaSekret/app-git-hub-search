import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { getRepositories, resetState } from './actions/requests';
import { debounce } from 'throttle-debounce';
import DrawRepository from './components/DrawRepository/DrawRepository';
import Buttons from './components/Buttons/Buttons';
import './App.scss';

interface OwnProps { }
type Props = OwnProps & DispatchFromProps;

interface State {
  subject?: string;
}

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      subject: '',
    };
  }

  onSuggestionsFetchRequested = debounce(1000, (q: string) => {
    this.props.getRepositories(q, 1);
  });

  componentDidUpdate() {
    if (this.state.subject) {
      this.onSuggestionsFetchRequested(this.state.subject);
    }
    if (this.state.subject === '') {
      this.props.resetState()
      this.onSuggestionsFetchRequested('');
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement> & React.SyntheticEvent): void => {
    e.persist();
    this.setState((state) => ({ subject: e.target.value }));
  }


  render() {
    const { subject } = this.state;
    return (
      <div className='app'>
        <input
          type='text'
          onChange={this.handleInputChange}
          className='app__subject'
          value={subject}
          placeholder='Введите название репозитория'
        />
        <Buttons subject={this.state.subject} />
        <DrawRepository />
      </div>);
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  getRepositories,
  resetState
}, dispatch)

type DispatchFromProps = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(App);

