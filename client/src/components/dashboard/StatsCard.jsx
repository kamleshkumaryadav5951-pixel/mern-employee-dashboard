const StatsCard = ({ title, value, subtitle, icon: Icon, gradient, change }) => {
  return (
    <div className={`${gradient} rounded-2xl p-6 text-white relative overflow-hidden
                     shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-default`}>
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
      <div className="absolute -right-2 top-8 w-16 h-16 bg-white/5 rounded-full" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <p className="text-4xl font-bold mt-1">{value ?? '—'}</p>
          {subtitle && (
            <p className="text-white/70 text-xs mt-2">{subtitle}</p>
          )}
          {change !== undefined && (
            <div className="mt-3 flex items-center gap-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                ${change >= 0 ? 'bg-white/20 text-white' : 'bg-red-400/30 text-white'}`}>
                {change >= 0 ? `+${change}` : change}% this month
              </span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
