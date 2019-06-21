import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { getRepositories } from "./actions/requests";
import { debounce } from "throttle-debounce";
import './App.scss';

interface OwnProps { }
type Props = OwnProps & DispatchFromProps;

interface State {
  subject?: string;
}

class App extends PureComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      subject: '',
    };
  }

  onSuggestionsFetchRequested = debounce(1000, (q: string) => {
    this.props.getRepositories(q);
  });

  componentDidUpdate() {
    console.log(this.state.subject)//если тут пусто очистить стейт
    if (this.state.subject) {
      this.onSuggestionsFetchRequested(this.state.subject);
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement> & React.SyntheticEvent): void => {
    e.persist();
    this.setState((prevState) => ({ subject: e.target.value }));

  }

  render() {
    const { subject } = this.state;
    return (
      <div className="app">
        <input
          type='text'
          onChange={this.handleInputChange}
          className='app__subject'
          value={subject}
          placeholder="Введите название репозитория"
        />
      </div>);
  }
}


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  getRepositories
}, dispatch)

type DispatchFromProps = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(App);

