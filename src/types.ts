export type Question = {
	questionId: string;
	questionFrontendId: string;
	title: string;
	titleSlug: string;
	content: string;
	difficulty: string;
	likes: number;
	dislikes: number;
	topicTags: Array<{
		name: string;
		slug: string;
		translatedName: string | null;
	}>;
	stats: string;
	hints: string[];
	solution: {
		id: string;
		canSeeDetail: boolean;
		paidOnly: boolean;
		hasVideoSolution: boolean;
		paidOnlyVideo: boolean;
	};
	status: string;
	metaData: string;
	note: string | null;
};

export type Problem = {
    link: string;
    questionId: string;
    questionFrontendId: string;
    questionTitle: string;
    titleSlug: string;
    difficulty: string;
    question: string;
    topicTags: Array<{
        name: string;
        slug: string;
        translatedName: string | null;
    }>;
    hints: string[];
    solution: {
        id: string;
        canSeeDetail: boolean;
        paidOnly: boolean;
        hasVideoSolution: boolean;
        paidOnlyVideo: boolean;
    };
    likes: number;
    dislikes: number;
};

export type ProblemMetadata = {
    stat: {
        question_id: number;
        question__article__live: string | null;
        question__article__slug: string | null;
        question__article__has_video_solution: boolean | null;
        question__title: string;
        question__title_slug: string;
        question__hide: boolean;
        total_acs: number;
        total_submitted: number;
        frontend_question_id: number;
        is_new_question: boolean;
    };
    status: string | null;
    difficulty: {
        level: number;
    };
    paid_only: boolean;
    is_favor: boolean;
    frequency: number;
    progress: number;
}