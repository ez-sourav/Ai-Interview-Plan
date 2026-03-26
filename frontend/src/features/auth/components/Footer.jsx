import '../../interview/style/footer.scss'
const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__logo">
        Interview<span>IQ</span>
      </h3>

      <p className="footer__text">
        Built with <span className="footer__heart">❤</span> by{" "}
        <span className="footer__name name">Sourav Biswas</span>
      </p>
    </footer>
  );
};

export default Footer;