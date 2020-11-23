<?php


namespace AwemaPL\VirtualTour;

use Auth;
use Illuminate\Support\Facades\{Cache, Cookie, Session};

class Tour
{
    public static function proceedCookie()
    {
        if (request()->user() ?? null) {
            if (self::isFromBeginning()){
                self::reset();
            }
            if (!Cookie::has('virtual-tour')) {
                self::setCookie();
            }else if (!self::isFromBeginning()){
                self::syncCookie();
            }
        }
    }

    public static function setFromBeginning()
    {
        if (request()->user() ?? null){
            Session::flash(self::getCacheKey() .'-from-beginning', true);
        }
    }

    /**
     * Is from beginning
     *
     * @return boolean
     */
    public static function isFromBeginning()
    {
        if (request()->user() ?? null){
           return Session::get(self::getCacheKey() .'-from-beginning', false);
        }
        return false;
    }

    /**
     * Reset
     */
    public static function reset()
    {
        Cookie::forget('virtual-tour');
        Cache::forget(self::getCacheKey());
        \DB::table('virtual_tours')->where('user_id', Auth::id())->delete();
    }

    protected static function setCookie()
    {
        $content = self::getStoredCookieContent();
        if (!empty($content)) {
            Cookie::queue('virtual-tour', urldecode($content), 0, null, null, false, false);
        }
    }

    protected static function syncCookie()
    {
        if (self::getStoredCookieContent() != ($content = Cookie::get('virtual-tour'))) {
            Cache::forget(self::getCacheKey());
            \DB::table('virtual_tours')->updateOrInsert(['user_id' => Auth::id()], ['content' => $content]);
        }
    }

    protected static function getStoredCookieContent()
    {
        if (empty($content = Cache::get(self::getCacheKey()))) {
            $content = optional(\DB::table('virtual_tours')->where('user_id', Auth::id())->first())->content;
           if ($content){
               Cache::forever(self::getCacheKey(), $content);
           }
        }
        return $content;
    }

    /**
     * Get cache key
     *
     * @return string
     */
    public static function getCacheKey()
    {
        return 'virtual-tour-' . request()->user()->id ;
    }
}
