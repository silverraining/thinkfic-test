const userProgress = new Map<number, Set<number>>();

export const updateProgress = (userId: number, courseId: number) => {
  if (!userProgress.has(userId)) {
    userProgress.set(userId, new Set());
  }
  userProgress.get(userId)!.add(courseId);
};

export const hasCompletedAll = (userId: number, required: number[]) => {
  const completed = userProgress.get(userId);
  return completed ? required.every((id) => completed.has(id)) : false;
};
