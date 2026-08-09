// async/await example in TypeScript

type UserProfile = {
  id: number;
  name: string;
  role: string;
};

const delay = <T>(ms: number, value: T, shouldReject = false): Promise<T> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error(`Failed after ${ms} ms`));
      } else {
        resolve(value);
      }
    }, ms);
  });

async function loadUserProfile(): Promise<UserProfile> {
  const user = await delay(100, { id: 1, name: "Ava" });
  const role = await delay(50, "admin");

  return { ...user, role };
}

async function loadUserProfileParallel(): Promise<UserProfile> {
  const [user, role] = await Promise.all([
    delay(100, { id: 1, name: "Ava" }),
    delay(50, "admin"),
  ]);

  return { ...user, role };
}

async function loadUserProfileSafe(): Promise<UserProfile> {
  try {
    const user = await delay(100, { id: 1, name: "Ava" });
    const role = await delay(50, "admin");

    return { ...user, role };
  } catch (error) {
    console.error("Failed to load profile:", error);
    throw error;
  }
}

void (async () => {
  const sequentialProfile = await loadUserProfile();
  console.log("async/await sequential:", sequentialProfile);

  const parallelProfile = await loadUserProfileParallel();
  console.log("async/await parallel:", parallelProfile);

  try {
    const safeProfile = await loadUserProfileSafe();
    console.log("async/await safe:", safeProfile);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Final handling:", error.message);
    }
  }
})();
