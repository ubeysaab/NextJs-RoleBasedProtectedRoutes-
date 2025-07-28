import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
<h1>example of Protected Routes</h1>
    <Link href={'/login'}>Login </Link>
    <Link href={'/admin'}>Admin</Link>
    </div>
  );
}
