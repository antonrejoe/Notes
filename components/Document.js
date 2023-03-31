function Document({ heading }) {
  return (
    <main>
      <h1>{heading ? heading : "Untitled"}</h1>
    </main>
  );
}
