import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

type StatsCardProps = {
  title: string;
  value?: number | string;
  subtitle?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend?: string;
  trendDirection?: "up" | "down";
  color?: "slate" | "emerald" | "blue" | "amber" | "rose";
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection,
  color = "slate",
}: StatsCardProps) {
  const colorClasses = {
    slate: "from-slate-500 to-slate-600 bg-slate-50",
    emerald: "from-emerald-500 to-emerald-600 bg-emerald-50",
    blue: "from-blue-500 to-blue-600 bg-blue-50",
    amber: "from-amber-500 to-amber-600 bg-amber-50",
    rose: "from-rose-500 to-rose-600 bg-rose-50",
  };

  return (
    <div className="relative overflow-hidden border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 rounded-lg">
      {/* Gradient circle background */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 bg-gradient-to-br ${colorClasses[color]} rounded-full opacity-5`}
      />

      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {value}
              </p>
              {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
            </div>
          </div>

          {Icon && (
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-sm`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {trend && (
          <div className="flex items-center mt-4 gap-2">
            {trendDirection === "up" ? (
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-500" />
            )}
            <span
              className={`text-sm font-medium ${
                trendDirection === "up" ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {trend}
            </span>
            <span className="text-sm text-slate-500">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
