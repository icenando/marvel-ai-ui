import loadingStyle from "./loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={loadingStyle.hourglass_container}>
      <div className={loadingStyle.hourglass}>
        <div className={loadingStyle.sandTop}></div>
        <div className={loadingStyle.sandBottom}></div>
      </div>
    </div>
  );
};

export default Loading;
