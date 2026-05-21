const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-20 px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-600 mb-4">
        Welcome to SportsNest. These terms govern your use of our platform.
      </p>
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Use of the Site</h2>
          <p className="text-gray-600">
            You agree to use SportsNest only for lawful purposes and to follow all
            applicable rules and policies.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Account Responsibility</h2>
          <p className="text-gray-600">
            You are responsible for keeping your account credentials secure and
            for all activity under your account.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p className="text-gray-600">
            For questions about these terms, email support@sportsnest.com.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
