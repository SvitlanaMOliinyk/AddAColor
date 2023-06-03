interface FirstStepProps {
  photo: string;
}
export const FirstStep = ({ photo }: FirstStepProps) => {
  return (
    <section className="photo-section">
      <div className="img-container-one">
        <img src={photo} alt="userPhoto" width={300} />
        <div className="background-test-one"></div>
      </div>
      <div className="img-container-two">
        <img src={photo} alt="userPhoto" width={300} />
        <div className="background-test-two"></div>
      </div>
    </section>
  );
};
