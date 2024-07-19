import styles from "./page.module.css";
import '../styles/global.css';
import RegisterSchool from "./registerSchool/page";
import SchoolDirectory from "./schoolDirectory/page";

export default function Home() {
  return (
    <main className={styles.main}>
     <RegisterSchool/>
     <SchoolDirectory/>
    </main>
  );
}
