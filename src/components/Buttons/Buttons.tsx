import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../redusers/index';
import { Dispatch, bindActionCreators } from 'redux';
import { getRepositories } from '../../actions/requests';
import { debounce } from 'throttle-debounce';
import ReactPaginate from 'react-paginate';
import './Buttons.scss';

interface OwnProps {
  subject?: string;
}
type Props = OwnProps & StateFromProps & DispatchFromProps;

class Buttons extends PureComponent<Props>{

  selectPageFetchRequested = debounce(1000, (subject: string, page: number) => {
    this.props.getRepositories(subject, page);
  });

  handlePageClick = (e: any) => {
    const { subject } = this.props;
    if (subject) {
      this.selectPageFetchRequested(subject, e.selected + 1)
    };
  }

  render() {
    const { total_count } = this.props;
    return (
      <>
        {total_count ?
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={total_count / 30}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            activeLinkClassName={'pagination__link'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            pageLinkClassName={'pagination__link'}
            breakLinkClassName={'pagination__link'}
            pageClassName={'pagination'}
            activeClassName={'pagination__active'}
          /> :
          null
        }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  getRepositories,
}, dispatch)

const mapStateToProps = (state: IAppState) => {
  return {
    total_count: state.requests.total_count,
  };
};

type DispatchFromProps = ReturnType<typeof mapDispatchToProps>;
type StateFromProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
