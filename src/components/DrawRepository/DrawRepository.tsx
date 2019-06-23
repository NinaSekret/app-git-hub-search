import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Repository } from '../../interfaces';
import { IAppState } from '../../redusers/index';
import './DrawRepository.scss';

interface OwnProps { }
type Props = OwnProps & StateFromProps;

class DrawRepositories extends PureComponent<Props>{
    renderRepository = () => {
        const { repositories } = this.props;
        if (repositories.length) {
            return repositories.map((item: Repository) => (
                <div key={item.id} className="repository">
                    <a target="blank" href={item.html_url} className="repository__link">{item.name}</a>
                    <p>Количество звезд: {item.stargazers_count}</p>
                    <p>Количество подписчиков: {item.watchers}</p>
                </div>
            ));
        }
    };

    render() {
        const { total_count } = this.props;
        return (<>
            <p>Всего репозиториев: {total_count}</p>
            {this.renderRepository()}</>)
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        total_count: state.requests.total_count,
        repositories: state.requests.repositories
    };
};

type StateFromProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(DrawRepositories);
