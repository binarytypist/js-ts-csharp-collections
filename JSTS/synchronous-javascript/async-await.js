// async/await example in JavaScript

const delay = (ms, value, shouldReject = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error(`Failed after ${ms} ms`));
      } else {
        resolve(value);
      }
    }, ms);
  });

async function loadUserProfile() {
  const user = await delay(100, { id: 1, name: "Ava" });
  const role = await delay(50, "admin");

  return { ...user, role };
}

async function loadUserProfileParallel() {
  const [user, role] = await Promise.all([
    delay(100, { id: 1, name: "Ava" }),
    delay(50, "admin"),
  ]);

  return { ...user, role };
}

async function loadUserProfileSafe() {
  try {
    const user = await delay(100, { id: 1, name: "Ava" });
    const role = await delay(50, "admin");

    return { ...user, role };
  } catch (error) {
    console.error("Failed to load profile:", error);
    throw error;
  }
}

(async () => {
  const sequentialProfile = await loadUserProfile();
  console.log("async/await sequential:", sequentialProfile);

  const parallelProfile = await loadUserProfileParallel();
  console.log("async/await parallel:", parallelProfile);

  try {
    const safeProfile = await loadUserProfileSafe();
    console.log("async/await safe:", safeProfile);
  } catch (error) {
    console.log("Final handling:", error.message);
  }
})();
