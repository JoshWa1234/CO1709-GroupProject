import { useAuth } from "@/context/AuthContext.jsx";
import {useEffect, useState} from "react"
import styles from "@/Features/Profile/components/PublicProfileForm/PublicProfileForm.module.css";
import useUserProfile from "@/Features/Profile/hooks/useUserProfile.js";
import InputBox from "@/ui Components/InputBox/InputBox.jsx";
import { useNavigate } from "react-router-dom";
import {useAccessibility} from "@/context/AccessibilityContext.jsx"
import Toggle from "@/ui Components/Toggle/Toggle.jsx";
import ResetPasswordForm from "@/Features/auth/components/ResetPasswordForm/ResetPasswordForm.jsx"

export default function PublicProfileForm() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showResetPassword, setShowResetPassword] = useState(false);

    const { displayName, setDisplayName, email, setEmail,
        tempDisplayName,
        setTempDisplayName,
        isEditing,
        handleEdit,
        handleSave,
        handleCancel,} = useUserProfile();
    const { darkMode, caretBrowsing, updateSetting } = useAccessibility();


    useEffect(() => {
        if (!user) navigate('/');
    }, [user]);

    if (!user) return null;

    return (
        <div className={styles.pageStyle}>
            <div className={styles.layoutStyle}>

                {/* Left sidebar */}
                <div className={styles.sidebarStyle}>
                    <button className={styles.sidebarButtonStyle}
                            onClick={() => setShowResetPassword(false)}>Settings</button>
                    <button className={styles.sidebarButtonStyle}>My Badges</button>
                    <button className={styles.sidebarButtonStyle}>Points History Log</button>
                    <button className={styles.sidebarButtonStyle} onClick={logout}>Log Out</button>
                </div>

                {showResetPassword ? (
                    <>
                        <div style={{display: "flex", flexDirection: "column"}}>

                            <div style={{width:'40%'}} >
                                <button className={styles["backButtonStyle"]} onClick={() => setShowResetPassword(false)}>← Back to Profile</button>
                            </div>

                            <ResetPasswordForm />
                        </div>
                    </>
                ) : (
                    <>
                    <div className={styles.panelStyle}>
                        <h2 className={styles.panelTitleStyle}>Public Profile</h2>
                        <div className={styles.avatarStyle}>👤</div>
                        <a className={styles.editPictureStyle}>Edit Profile Picture</a>

                        <div className={styles.fieldsStyle}>
                            <InputBox
                                tag="displayName"
                                type="text"
                                label="Display Name"
                                validation="none"
                                value={isEditing ? tempDisplayName : displayName}
                                onChange={setTempDisplayName}
                                readOnly={!isEditing}
                            />
                            <InputBox tag="email" type="email" label="Email" validation="email"
                                      value={email} onChange={setEmail} readOnly />
                            <InputBox tag="password" type="password" label="Password" validation="none"
                                      value="**********" onChange={() => {}} readOnly />

                            <a className={styles.resetPasswordStyle}
                               onClick={() => setShowResetPassword(true)}
                               style={{ cursor: 'pointer' }}
                            >
                                Reset Password
                            </a>
                        </div>
                        <div className={styles.panelStyleFooter}>
                            {!isEditing ? (
                                <button className={styles["backButtonStyle"]} onClick={handleEdit}>Edit</button>
                            ) : (
                                <>
                                    <div className={styles["btnGroupStyle"]}>
                                        <button className={styles["saveButton"]} onClick={handleSave}>Save</button>
                                        <button  className={styles["backButtonStyle"]} onClick={handleCancel}>Cancel</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                        {/* Right - accessibility */}
                        <div className={styles.accessibilityPanelStyle}>
                            <h2 className={styles.panelTitleStyle}>Accessibility</h2>

                            <div className={styles.toggleRowStyle}>
                                <Toggle onChange={() => updateSetting('darkMode', !darkMode)} value={darkMode}></Toggle>
                                <span>Dark Mode</span>
                            </div>

                            <div className={styles.toggleRowStyle}>
                                <Toggle
                                    value={caretBrowsing}
                                    onChange={(val) => {
                                        updateSetting('caretBrowsing', val);
                                        if (val) alert('Press F7 in your browser to enable caret browsing');
                                    }}
                                />
                                <span>Caret Browsing</span>
                            </div>
                            <div className={styles.fontRowStyle}>
                                <div className={styles.fontOptionActiveStyle}>✓ Aa</div>
                                <div className={styles.fontOptionStyle}>Aa</div>
                                <div className={styles.fontOptionStyle}>Aa</div>
                            </div>
                        </div>
                    </>

                )}



            </div>
        </div>
    );
}