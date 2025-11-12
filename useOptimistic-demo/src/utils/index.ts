export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const delayWithError = (ms: number): Promise<void> =>
  new Promise((resolve, reject) => {
    // 15% chance of simulated failure
    const fail = Math.random() < 0.15;
    setTimeout(
      () => (fail ? reject(new Error("Server error")) : resolve()),
      ms
    );
  });

export const generateIdNumber = () => Date.now() + Math.random();
