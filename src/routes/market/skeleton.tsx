export const Skeleton = () => {
	return (
		<div class="overflow-hidden transition-all hover:shadow-md rounded-lg border border-border bg-background flex flex-col">
			<div class="bg-gradient-to-r from-purple-500/10 to-teal-500/10 p-4 pb-2">
				<div class="flex justify-between items-start">
					<div class="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
					<div class="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
				</div>
				<div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mt-2 animate-pulse" />
			</div>

			<div class="p-4 pt-4 flex-grow">
				<div class="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
			</div>

			<div class="flex justify-between p-4 bg-muted/30 border-t border-border">
				<div class="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
				<div class="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
			</div>
		</div>
	);
};
