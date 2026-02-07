import { Calendar, Clock, Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const AppointmentCard = ({
  doctorName,
  patientName,
  specialty,
  date,
  time,
  type,
  status,
  avatar,
  showActions = true,
  customActions,
  userType = "patient",
  onJoin,
  onReschedule,
  onCancel,
}) => {
  const { t } = useTranslation();
  const statusStyles = {
    upcoming: "badge-pending",
    completed: "bg-muted text-muted-foreground",
    cancelled: "bg-destructive/10 text-destructive",
  };

  const name = userType === "patient" ? doctorName : patientName;

  const isCompleted = status === "completed";

  return (
    <div className={`dashboard-card p-5 ${isCompleted ? "bg-muted/30" : "hover-lift"}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-xl object-cover" />
          ) : (
            <span className="text-primary font-semibold">
              {name?.charAt(0) || "?"}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold text-foreground truncate">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
                {userType === "patient" ? `${t('common.dr')} ${t(doctorName)}` : patientName}
              </h4>
              {specialty && (
                <p className="text-sm text-muted-foreground">{t(specialty)}</p>
<<<<<<< HEAD
=======
=======
                {userType === "patient" ? `${t('common.dr')} ${doctorName}` : patientName}
              </h4>
              {specialty && (
                <p className="text-sm text-muted-foreground">{specialty}</p>
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
              )}
            </div>
            <span className={`badge-status ${statusStyles[status]} capitalize`}>
              {t(`appointments.${status}`)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {type === "video" ? (
                <Video className="w-4 h-4 text-primary" />
              ) : (
                <MapPin className="w-4 h-4 text-accent" />
              )}
              <span className="capitalize">
                {type === 'video' ? t('common.video') : type === 'in-person' ? t('common.inPerson') : type}
              </span>
            </div>
          </div>

          {showActions && status === "upcoming" && (
            <div className="flex items-center gap-2 mt-4">
              {type === "video" && (
                <Button size="sm" variant="default" onClick={onJoin}>
                  {t('common.joinCall')}
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={onReschedule}>
                {t('common.reschedule')}
              </Button>
              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={onCancel}>
                {t('common.cancel')}
              </Button>
            </div>
          )}

          {customActions && (
            <div className="flex items-center gap-2 mt-4">
              {customActions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
