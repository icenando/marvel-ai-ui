import loadingStyle from "./loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={loadingStyle.spinner_container}>
      <div className={loadingStyle.hourglass}>
        <div className={loadingStyle.sand}></div>
      </div>
    </div>
  );
};

export default Loading;
