import "@/styles/globals.css";
import Header from "../components/layout/Header";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter()

  const scrollToSection = async (id) => {
    await router.push('/')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onLoginClick = () => {
    router.push('/login')
  }

  return (
    <>
      <Header scrollToSection={scrollToSection} onLoginClick={onLoginClick} />
      <Component {...pageProps} />
    </>
  )
}
