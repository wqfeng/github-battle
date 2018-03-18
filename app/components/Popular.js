var React = require("react");
var PropTypes = require("prop-types");
var api = require("../utils/api");

const SelectLanguage = ({selectedLanguage, onSelect}) => {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"]
    return (
        <ul className='languages'>
            {languages.map((lang) => {
                return (
                    <li key={lang}
                        style={lang === selectedLanguage ? {color: '#d0021b'} : null}
                        onClick={onSelect.bind(null, lang)}>
                        {lang}
                    </li>
                )})}
        </ul>
    );
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const RepoGrid = ({repos}) => (
    <ul className="popular-list">
        {repos.map((repo, index) => 
            <li key={repo.name} className="popular-item">
                <div className="popular-rank">#{index + 1}</div>
                <ul className="space-list-items">
                    <li>
                        <img 
                            className="avatar"
                            src={repo.owner.avatar_url}
                            alt={`Avatar for ${repo.owner.login}`}/>
                    </li>
                    <li><a href={repo.html_url}>{repo.name}</a></li>
                    <li>@{repo.owner.login}</li>
                    <li>{repo.stargazers_count} stars</li>
                </ul>

            </li>)}
    </ul>
);


class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: "All",
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        api.fetchPopularRepos(lang).then(
            repos => this.setState(() => ({repos})));
    }

    render() {
        return (
            <div>
            <SelectLanguage
                selectedLanguage = {this.state.selectedLanguage}
                onSelect = {this.updateLanguage}
            />
            {
                !this.state.repos
                ? <p>Loading...</p>
                : <RepoGrid repos={this.state.repos} />
            }
            
            </div>
        );
    }
}

module.exports = Popular;