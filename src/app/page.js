import Beranda from './beranda/Beranda';
import FloatingChatPanel from './components/FloatingChatPanel';
import LoadingWrapper2 from './components/LoadingWrapper2';

export default function Home() {
  return (
    <>
      <LoadingWrapper2>
      <FloatingChatPanel />
      <Beranda />
      </LoadingWrapper2>
    </>
  );
}
