export const Skeleton = () => {
	return (
		<tr class="border-b border-border/50 hover:bg-muted/20 transition-colors">
			<td class="px-4 py-3 font-medium">
				<div class="flex items-center">
					<div class="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
					<div class="h-4 w-8 ml-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
				</div>
			</td>
			<td class="px-4 py-3 font-semibold">
				<div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
			</td>
			<td class="px-4 py-3">
				<div class="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
			</td>
			<td class="px-4 py-3">
				<div class="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
			</td>
			<td class="px-4 py-3 text-right font-medium">
				<div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
			</td>
		</tr>
	);
};
