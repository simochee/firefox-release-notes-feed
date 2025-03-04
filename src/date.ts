import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatRFC822 = (date: Date) => {
	return format(date, "EEE, dd MMM yyyy HH:mm:ss xx", {
		locale: enUS,
	});
};
