import { useNavigate } from "react-router-dom";
import { terms } from "../data/curriculum";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import styles from "./TermsOverview.module.css";

function TermsOverview() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <BilingualText as="h1" af="Die Kwartale" en="The Terms" />
      <div className={styles.grid}>
        {terms.map((term) => (
          <Card
            key={term.id}
            className={styles.termCard}
            onClick={() => navigate(`/kwartale/${term.id}`)}
          >
            <BilingualText as="h2" af={term.title} en={`Term ${term.number}`} />
            <BilingualText af={term.subtitle} en={term.englishSubtitle} />
            <span className={styles.themeCount}>
              {term.themes.length} temas (themes)
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TermsOverview;
