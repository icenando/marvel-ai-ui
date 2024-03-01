import loadingStyle from "./loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={loadingStyle.hourglass_container}>
      <svg className={loadingStyle.hourglass}>
        <path d="M0 0H100C100 25 75 50 55 50 75 50 100 75 100 100H0C0 75 25 50 45 50 25 50 0 25 0 0Z" />
        <path className={loadingStyle.sandTop} d="M10 5H90L51 50 49 50Z" />
        {/* <path className={loadingStyle.sandBottom} d="M10 95H90L51 50 49 50Z" /> */}
      </svg>
    </div>
  );
};

export default Loading;
