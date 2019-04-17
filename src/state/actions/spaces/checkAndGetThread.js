import Box from '3box';

const checkAndGetThread = async (spaceData, spaceName) => {
  try {
    const threadNames = [];
    const threadCalls = [];

    Object.entries(spaceData).forEach((kv) => {
      if (kv[0].substring(0, 7) === 'thread-') {
        threadNames.push(kv[1].name);
        const promise = Box.getThread(spaceName, kv[1].name);
        threadCalls.push(promise);
      }
    });

    if (threadCalls.length === 0) return null;
    const threadPromise = Promise.all(threadCalls);
    const threadData = await threadPromise;

    const threadParams = {
      threadNames,
      threadData,
    };

    return threadParams;
  } catch (err) {
    console.error(err);
  }
};

export default checkAndGetThread;